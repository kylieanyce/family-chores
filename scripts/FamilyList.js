import { getChores, useChores } from "./ChoreProvider.js"
import { getFamilyMembers, useFamilyMembers } from "./FamilyProvider.js"
import { getFamilyChores, useFamilyChores } from "./FamilyChoreProvider.js"
import { FamilyMember } from "./FamilyMember.js"

const contentTarget = document.querySelector(".family")

let chores = []
let people = []
let peopleChores = []


export const FamilyList = () => {
    getChores()
        .then(getFamilyMembers)
        .then(getFamilyChores)
        .then(() => {
            
            const chores = useChores()
            const people = useFamilyMembers()
            const peopleChores = useFamilyChores()
            render(chores, people, peopleChores)
        })
}

const render = (chores, people, peopleChores) => {
    //maps through people array and for each obj it invokes getChoreRelationships
    contentTarget.innerHTML = people.map(person => {
        //finds people who are responsible for famChores and sets in var
        const relationshipObjects = getChoreRelationships(person)
        
        const choreObjects = convertChoreIdsToChores(relationshipObjects)

        // Get HTML representation of product
        const html = FamilyMember(person, choreObjects)

        return html
    }).join("")
}

// Get corresponding relationship objects for a person
const getChoreRelationships = (person) => {
    //filters through array and for each obj, finds matching person id  
    //of familyChore, so it finds who contributes to famChores
    const relatedChores = peopleChores.filter(pc => pc.familyMemberId === person.id)
    return relatedChores
}

// Convert array of foreign keys to array of objects
const convertChoreIdsToChores = (relationships) => {
    //
    const choreObjects = relationships.map(rc => {
        return chores.find(chore => chore.id === rc.choreId)
    })
    return choreObjects
}