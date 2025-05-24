
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, Calendar, TrendingUp, Activity, Heart, Stethoscope, ClipboardList } from "lucide-react";

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Cases",
      value: "1,429",
      change: "+8.2%", 
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Appointments Today",
      value: "47",
      change: "+3.1%",
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Recovery Rate",
      value: "94.2%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "appointment",
      patient: "Sarah Johnson",
      time: "10:30 AM",
      status: "completed",
      icon: Calendar,
    },
    {
      id: 2,
      type: "checkup",
      patient: "Michael Chen",
      time: "11:15 AM", 
      status: "in-progress",
      icon: Stethoscope,
    },
    {
      id: 3,
      type: "surgery",
      patient: "Emily Davis",
      time: "2:00 PM",
      status: "scheduled",
      icon: Heart,
    },
    {
      id: 4,
      type: "consultation",
      patient: "David Wilson",
      time: "3:30 PM",
      status: "scheduled",
      icon: ClipboardList,
    },
  ];

  const departmentStats = [
    { name: "Cardiology", patients: 234, capacity: 300 },
    { name: "Neurology", patients: 189, capacity: 250 },
    { name: "Pediatrics", patients: 156, capacity: 200 },
    { name: "Orthopedics", patients: 98, capacity: 150 },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medical Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening at your facility today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title} className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest patient interactions and appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-medical/10 text-medical">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="font-medium">{activity.patient}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {activity.type} at {activity.time}
                      </p>
                    </div>
                    <span
                      className={
                        activity.status === "completed"
                          ? "status-active"
                          : activity.status === "in-progress"
                          ? "status-pending"
                          : "status-inactive"
                      }
                    >
                      {activity.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Department Capacity */}
        <Card>
          <CardHeader>
            <CardTitle>Department Capacity</CardTitle>
            <CardDescription>Current patient load by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentStats.map((dept) => {
                const percentage = Math.round((dept.patients / dept.capacity) * 100);
                return (
                  <div key={dept.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {dept.patients}/{dept.capacity}
                      </span>
                    </div>
                    <Progress 
                      value={percentage} 
                      className="h-2"
                      indicatorClassName={
                        percentage > 80 
                          ? "bg-red-500" 
                          : percentage > 60 
                          ? "bg-yellow-500" 
                          : "bg-medical"
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {percentage}% capacity
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
