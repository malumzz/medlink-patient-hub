
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Stat {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  change: string;
  trend: "up" | "down";
}

interface ActivityItem {
  patient: string;
  action: string;
  doctor: string;
  time: string;
}

interface Appointment {
  patient: string;
  time: string;
  type: string;
  doctor: string;
  status: string;
}

interface DepartmentWorkload {
  department: string;
  patients: number;
  capacity: number;
}

const Dashboard = () => {
  // Mock data for stats
  const stats: Stat[] = [
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
  const recentActivity: ActivityItem[] = [
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
  const upcomingAppointments: Appointment[] = [
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
  const departmentWorkload: DepartmentWorkload[] = [
    { department: "Cardiology", patients: 42, capacity: 60 },
    { department: "Neurology", patients: 38, capacity: 45 },
    { department: "Pediatrics", patients: 28, capacity: 50 },
    { department: "Orthopedics", patients: 35, capacity: 40 },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
        ))}
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
                      className={`h-2 ${
                        percentage > 80 ? "bg-medical-danger/30" : "bg-medical/30"
                      }`}
                      indicatorClassName={percentage > 80 ? "bg-medical-danger" : "bg-medical"}
                    />
                  </div>
                );
              })}
            </div>
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
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
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
              ))}
            </div>
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
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
