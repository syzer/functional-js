getIncompleteTaskSummaries = (memberName) ->
  fetchData()
  .then R.get "tasks"
  .then R.filter R.propEq "username", memberName
  .then R.reject R.propEq "complete", true
  .then R.map R.pick ["id", "dueDate", "title", "priority"]
  .then R.sortBy R.get "dueDate"
