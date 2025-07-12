import { createSlice } from "@reduxjs/toolkit";

const addProjectsAsync = (payload)=>(dispatch, getState)=>{
    dispatch(addProjects(payload));
    const { projects } = getState();
    localStorage.setItem("projectsList", JSON.stringify(projects.projects));
}

const initialState = {
    projects:JSON.parse(localStorage.getItem("projectsList"))||[]
}

const projectsSlice = createSlice({
    name:'projects',
    initialState,
    reducers:{
        addProjects:(state, action)=>{
            const projects = state.projects;
            const updatedProjects = [...projects, action.payload];
            state.projects = updatedProjects;
        }
    }
})

export { addProjectsAsync }
export const {addProjects} = projectsSlice.actions;
export const projectsList = (state)=>state.projects.projects;
export default projectsSlice.reducer;