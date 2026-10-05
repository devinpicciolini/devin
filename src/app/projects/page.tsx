import ProjectTile from '@/components/ProjectTile'
import { PROJECTS } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <div className="py-8">
      <h1 className="font-mono text-sm text-muted mb-8">~/projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <ProjectTile key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  )
}
