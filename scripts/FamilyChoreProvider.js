let familyChores = []

export const useFamilyChores = () => familyChores.slice()

//gets family chores from API-------------------------------------------------
export const getFamilyChores = () => fetch("http://localhost:8088/familychores")
    .then(res => res.json())
    .then(data => familyChores = data)