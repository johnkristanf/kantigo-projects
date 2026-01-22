import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export const ProjectOverviewCard = ({selectedProject}: {selectedProject: any}) => {

  const progressPercentage = selectedProject ? (selectedProject.completed / selectedProject.total) * 100 : 0;

    return (
        <div className="m-6 bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="w-16 h-16 ">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedProject?.name}`} />
              <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
                {selectedProject?.name.split(' ').map(word => word[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-4xl font-bold tracking-tight">{selectedProject?.name}</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-blue-100 text-lg font-medium">Task Progress</span>
              <span className="text-3xl font-bold">
                {selectedProject?.completed} / {selectedProject?.total}
              </span>
            </div>
            <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm shadow-inner">
              <div className="h-4 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-yellow-300 via-amber-200 to-yellow-100 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <p className="text-blue-50 text-base font-medium">
              {progressPercentage.toFixed(1)}% complete
            </p>
          </div>
        </div>
      </div>
    )
}