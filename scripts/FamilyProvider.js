let people = []

export const useFamilyMembers = () => people.slice()

//get family members from API---------------------------------------------------
export const getFamilyMembers = () => fetch("http://localhost:8088/familymembers")
    .then(res => res.json())
    .then(data => people = data)