
import { ArrowRight, Calendar } from "lucide-react"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "~/components/ui/drawer"
import { getPriorityColor, getWeightColor } from "~/lib/utils"
import { TaskStatus } from "~/types/projects"

export const TaskCards = ({status, tasks}: {status:string, tasks: any[]}) => {
    return (
        <div className="space-y-3">
                  <Drawer direction='right'>
  <DrawerTrigger className='w-full flex flex-col gap-3'>
    {tasks && tasks.map(task => (
                      <div
                        key={task.id}
                        className=" bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border border-slate-200 hover:border-blue-300"
                      >
                        {/* Task Title */}
                        <h4 className="font-semibold text-slate-800 mb-3 text-start">{task.name}</h4>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold border ${getWeightColor(task.weight)}`}>
                            {task.weight}
                          </span>
                        </div>

                        {/* Assignee */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm text-slate-600 font-medium">{task.assignee}</span>
                        </div>

                        {/* Dates */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 border-t pt-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{task.start_date}</span>
                          </div>
                          <span>→</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{task.end_date}</span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                            {
                                status && status === TaskStatus.TODO && (
                                    <button
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold mt-3 transition-colors"
                                    title="Move to In Progress"
                                    onClick={e => {
                                        e.stopPropagation();
                                        // Placeholder: replace with actual move-to-in-progress functionality
                                        alert(`Move task "${task.name}" to In Progress`);
                                    }}
                                    >
                                        <span>Move to In Progress</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )
                            }
                        </div>

                      </div>
                    ))}
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                    </DrawerContent>
                    </Drawer>
                    
                </div>
    )
}