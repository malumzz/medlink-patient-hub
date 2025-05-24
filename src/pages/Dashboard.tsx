
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, Activity, ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { 
  useDashboardStats, 
  useRecentActivity, 
  useUpcomingAppointments, 
  useDepartmentWorkload 
} from "@/hooks/useDashboard";

interface Stat {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  change: string;
  trend: "up" | "down";
}

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity();
  const { data: upcomingAppointments, isLoading: appointmentsLoading } = useUpcomingAppointments();
  const { data: departmentWorkload, isLoading: workloadLoading } = useDepartmentWorkload();

  // Transform stats data for display
  const displayStats: Stat[] = stats ? [
    {
      title: "Total Patients",
      value: stats.totalPatients.toString(),
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Appointments",
      value: stats.appointments.toString(),
      icon: Calendar,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Medical Records",
      value: stats.medicalRecords.toString(),
      icon: FileText,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Total Staff",
      value: stats.totalStaff.toString(),
      icon: Users,
      change: "-3%",
      trend: "down",
    },
  ] : [];

  if (statsError) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading dashboard data</p>
            <p className="text-muted-foreground">{statsError.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsLoading ? (
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          displayStats.map((stat, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                  </div>
                  <div className="rounded-full bg-medical/10 p-2 text-medical">
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUp className="mr-1 h-3 w-3 text-medical-success" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3 text-medical-danger" />
                  )}
                  <span className={stat.trend === "up" ? "text-medical-success" : "text-medical-danger"}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Department Workload */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Department Workload
            </CardTitle>
            <CardDescription>Current patient distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            {workloadLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {departmentWorkload?.map((dept, index) => {
                  const percentage = Math.round((dept.patients / dept.capacity) * 100);
                  return (
                    <div key={index}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">{dept.department}</span>
                        <span className="text-sm text-muted-foreground">
                          {dept.patients}/{dept.capacity} patients ({percentage}%)
                        </span>
                      </div>
                      <Progress
                        value={percentage}
                        className={`h-2 ${
                          percentage > 80 ? "bg-medical-danger/30" : "bg-medical/30"
                        }`}
                        indicatorClassName={percentage > 80 ? "bg-medical-danger" : "bg-medical"}
                      />
                    </div>
                  );
                }) || []}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Today's scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {appointmentsLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments?.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.time} - {appointment.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{appointment.doctor}</p>
                      <p
                        className={`text-xs ${
                          appointment.status === "Confirmed"
                            ? "text-medical-success"
                            : "text-medical-warning"
                        }`}
                      >
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                )) || []}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6 card-hover">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your medical facility</CardDescription>
        </CardHeader>
        <CardContent>
          {activityLoading ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity?.map((activity, index) => (
                <div key={index} className="flex items-center border-b pb-3 last:border-0">
                  <div className="mr-4 h-2 w-2 rounded-full bg-medical" />
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.patient}</span> - {activity.action}
                    </p>
                    <div className="mt-1 flex text-xs text-muted-foreground">
                      <span>{activity.doctor}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              )) || []}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
