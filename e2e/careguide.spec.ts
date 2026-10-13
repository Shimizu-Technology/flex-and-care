import { expect, test } from '@playwright/test'

test('shows a source-backed answer from a suggested question', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Content review' })).toHaveCount(0)
  await page.getByRole('button', { name: /Where can I find adult diapers on Guam/ }).click()

  await expect(page.getByRole('heading', { name: /Start with the right product details/ })).toBeVisible()
  await expect(page.getByText('What you can do now')).toBeVisible()
  await expect(page.getByText('Start here on Guam')).toBeVisible()
  await expect(page.getByText('Why you can trust this answer')).toBeVisible()
})

test('admits when no reviewed answer exists', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('What do you need help with today?').fill('Can you complete my tax return?')
  await page.getByRole('button', { name: 'Find guidance' }).click()

  await expect(page.getByRole('heading', { name: /I don’t have a trusted answer/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /Browse local resources/ })).toBeVisible()
})

test('filters the local resource directory', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Resources' }).click()
  await page.getByRole('button', { name: 'Transportation', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'GRTA ADA Paratransit' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'National Family Caregiver Support Program' })).toHaveCount(0)
})

test('builds a focused caregiver plan without collecting personal information', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Build a simple caregiver plan/ }).click()

  await page.getByRole('button', { name: /An older adult/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByText('What feels most important today?', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: /A break or respite/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByText('How soon do you need help?', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: /This week/ }).click()
  await page.getByRole('button', { name: /Create my plan/ }).click()

  await expect(page.getByRole('heading', { name: /Start with a caregiver-support intake/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Your starting plan' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Who to contact' })).toBeVisible()
  await page.getByRole('button', { name: /Prepare for a support call/ }).click()
  await expect(page.getByText(/Your plan is ready/)).toBeVisible()
})

test('keeps urgent human routes available from every page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('banner').getByRole('button', { name: 'Urgent help' }).click()

  await expect(page.getByRole('heading', { name: 'What kind of help is needed?' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Call 911' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Call or text 988' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Call APS/ })).toBeVisible()
})

test('shows the editorial content model', async ({ page }) => {
  await page.goto('/?team=1')

  await expect(page.getByRole('heading', { name: /Keep every answer current/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /Open caregiver experience/ })).toBeVisible()
  await page.getByRole('button', { name: /Navigating Guam support programs/ }).click()
  await expect(page.getByText('Published', { exact: true })).toBeVisible()
  await expect(page.getByText('Publication checks')).toBeVisible()
  await expect(page.getByText(/Owner and review reminder are scheduled/)).toBeVisible()
})

test('captures the key product states', async ({ page }, testInfo) => {
  const capture = (name: string) => page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: true,
    animations: 'disabled',
    style: '.skip-link { display: none !important; }',
  })
  const browserErrors: string[] = []
  page.on('pageerror', (error) => browserErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      const sourceUrl = message.location().url
      browserErrors.push(sourceUrl ? `${message.text()} (${sourceUrl})` : message.text())
    }
  })
  page.on('response', (response) => {
    if (response.status() >= 400) browserErrors.push(`${response.status()} ${response.url()}`)
  })

  await page.goto('/')
  await capture(`home-${testInfo.project.name}.png`)

  await page.getByRole('button', { name: /Build a simple caregiver plan/ }).click()
  await expect(page.getByText('Who are you supporting?', { exact: true })).toBeVisible()
  await capture(`plan-start-${testInfo.project.name}.png`)
  await page.getByRole('button', { name: /An older adult/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /A break or respite/ }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: /This week/ }).click()
  await page.getByRole('button', { name: /Create my plan/ }).click()
  await expect(page.getByRole('heading', { name: /Start with a caregiver-support intake/ })).toBeVisible()
  await capture(`plan-result-${testInfo.project.name}.png`)

  await page.getByRole('button', { name: 'Ask' }).click()
  await page.getByRole('button', { name: /Why does my loved one get agitated/ }).click()
  await expect(page.getByRole('heading', { name: /Late-day agitation can have several causes/ })).toBeVisible()
  await capture(`answer-${testInfo.project.name}.png`)

  await page.getByRole('button', { name: 'Resources' }).click()
  await expect(page.getByRole('heading', { name: /Find the right door to knock on/ })).toBeVisible()
  await capture(`resources-${testInfo.project.name}.png`)

  await page.getByRole('banner').getByRole('button', { name: 'Urgent help' }).click()
  await expect(page.getByRole('heading', { name: 'What kind of help is needed?' })).toBeVisible()
  await capture(`urgent-help-${testInfo.project.name}.png`)
  await page.getByRole('button', { name: 'Close urgent help' }).click()

  await page.goto('/?team=1')
  await expect(page.getByRole('heading', { name: /Keep every answer current/ })).toBeVisible()
  await capture(`review-${testInfo.project.name}.png`)
  expect(browserErrors).toEqual([])
})
