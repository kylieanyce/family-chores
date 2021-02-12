let chores = []

export const useChores = () => chores.slice()

//get chores from API-----------------------------------------------
export const getChores = () => fetch("http://localhost:8088/chores")
    .then(res => res.json())
    .then(data => chores = data)