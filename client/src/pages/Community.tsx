import { useEffect, useState } from "react"
import { Project } from "../types"
import { dummyGenerations } from "../ugc_assets/assets/assets"
import { Loader } from "lucide-react"
import ProjectCard from "../components/ProjectCard"

const Community = () => {
    const [projects , setProjects] = useState<Project[]>([])
    const [loading , setLoading] = useState(true)

    const fetchProjects = async ()=>{
        setTimeout(()=>{
            setProjects(dummyGenerations)
            setLoading(false)
        },1500) // Shorter timeout for snappier mock loading
    }

    useEffect(()=>{
        fetchProjects();
    },[]);
    
    if(loading){
        return (
            <div className="flex flex-col gap-4 items-center justify-center h-[70vh]">
                <Loader className="animate-spin h-12 w-12 text-lavender-500"/>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading community designs...</p>
            </div>
        )
    }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Community Showcase</h1>
        <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-400">
          Explore UGC ad videos and image designs created by our community.
        </p>
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id || index} gen={project} />
        ))}
      </div>
    </div>
  )
}   

export default Community