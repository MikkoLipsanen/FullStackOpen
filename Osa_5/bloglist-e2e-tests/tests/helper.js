
const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, titleContent, authorContent, urlContent) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title-input').fill(titleContent)
    await page.getByTestId('author-input').fill(authorContent)
    await page.getByTestId('url-input').fill(urlContent)
    await page.getByRole('button', { name: 'add' }).click()
    await page.getByText(`${titleContent} ${authorContent} view`).waitFor()
}
  
  export { loginWith, createBlog }