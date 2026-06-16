import { type Page } from '@playwright/test';

/**
 * Set a list-page Season filter. SeasonMenu renders a MUI popup `<Select>`
 * (role=combobox opening a role=listbox), NOT a native `<select>`, so
 * `page.selectOption()` does not work. Open the combobox, then click the option.
 *
 * @param filterId the Select id, e.g. 'drivers-season-filter'
 * @param year a season year, or 'Any' for the value=-1 option
 */
export async function selectSeason(
	page: Page,
	filterId: string,
	year: number | 'Any'
): Promise<void> {
	await page.locator(`#${filterId}`).click();
	const name = year === 'Any' ? 'Any' : String(year);
	await page.getByRole('option', { name, exact: true }).click();
}
