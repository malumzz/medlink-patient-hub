
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Component/ui/card";
import { Users, Calendar, FileText, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { Progress } from "../Component/ui/progress";

const Dashboard = () => {
  // Mock data for stats
  const stats = [
    {
      title: "Total Patients",
      value: "3,285",
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Appointments",
      value: "42",
      icon: Calendar,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Medical Records",
      value: "1,235",
      icon: FileText,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Total Staff",
      value: "48",
      icon: Users,
      change: "-3%",
      trend: "down",
    },
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      patient: "Emma Wilson",
      action: "Appointment scheduled",
      doctor: "Dr. Roberts",
      time: "10 minutes ago",
    },
    {
      patient: "John Miller",
      action: "Lab results updated",
      doctor: "Dr. Thompson",
      time: "25 minutes ago",
    },
    {
      patient: "Sophia Garcia",
      action: "Prescription renewed",
      doctor: "Dr. Johnson",
      time: "1 hour ago",
    },
    {
      patient: "Michael Chen",
      action: "Check-up completed",
      doctor: "Dr. Williams",
      time: "2 hours ago",
    },
    {
      patient: "Olivia Brown",
      action: "MRI scheduled",
      doctor: "Dr. Davis",
      time: "3 hours ago",
    },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      patient: "Robert Lee",
      time: "10:00 AM",
      type: "Check-up",
      doctor: "Dr. Martinez",
      status: "Confirmed",
    },
    {
      patient: "Sarah Johnson",
      time: "11:30 AM",
      type: "Follow-up",
      doctor: "Dr. Thompson",
      status: "Pending",
    },
    {
      patient: "David Wilson",
      time: "1:15 PM",
      type: "Consultation",
      doctor: "Dr. Roberts",
      status: "Confirmed",
    },
  ];

  // Mock data for department workload
  const departmentWorkload = [
    { department: "Cardiology", patients: 42, capacity: 60 },
    { department: "Neurology", patients: 38, capacity: 45 },
    { department: "Pediatrics", patients: 28, capacity: 50 },
    { department: "Orthopedics", patients: 35, capacity: 40 },
  ];

  return (
    <div className="animate-fade-in p-6">
      <h1 className="mb-6 text-3xl font-bold">Healthcare Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                  <stat.icon size={20} />
                </div>
              </div>
              <div className="mt-3 flex items-center text-xs">
                {stat.trend === "up" ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1 text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
            <div className="space-y-4">
              {departmentWorkload.map((dept, index) => {
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
                      className="h-2"
                      indicatorClassName={percentage > 80 ? "bg-red-500" : "bg-blue-500"}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest patient activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.patient}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.doctor} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Today's Appointments
          </CardTitle>
          <CardDescription>Scheduled appointments for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{appointment.time}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === "Confirmed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <p className="text-sm font-medium">{appointment.patient}</p>
                <p className="text-xs text-muted-foreground">{appointment.type}</p>
                <p className="text-xs text-muted-foreground">{appointment.doctor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
