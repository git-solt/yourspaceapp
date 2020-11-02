const addTitle = (title) => ({
  type: 'ADD_TITLE',
  title
})

const addContent = (content) => ({
  type: 'ADD_CONTENT',
  content
})

const addTitleContent = (search) => ({
  type: 'ADD_TITLE_CONTENT',
  search
})

export {addTitle, addContent, addTitleContent}