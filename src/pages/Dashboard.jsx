
import React from "react";
import { Users, Calendar, FileText, Activity, ArrowUp, ArrowDown } from "lucide-react";

// Inline UI Components
const Card = ({ className = "", children, ...props }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

const Progress = ({ value = 0, className = "", indicatorClassName = "" }) => (
  <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
    <div 
      className={`h-full w-full flex-1 bg-[#274D60] transition-all ${indicatorClassName}`}
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </div>
);

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
    <div className="animate-fade-in">
      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .card-hover {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      
      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                </div>
                <div className="rounded-full bg-[#274D60]/10 p-2 text-[#274D60]">
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
                <span className="ml-1 text-gray-500">from last month</span>
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
                      <span className="text-sm text-gray-500">
                        {dept.patients}/{dept.capacity} patients ({percentage}%)
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className={`h-2 ${
                        percentage > 80 ? "bg-red-200" : "bg-gray-200"
                      }`}
                      indicatorClassName={percentage > 80 ? "bg-red-600" : "bg-[#274D60]"}
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
                    <p className="text-sm text-gray-500">
                      {appointment.time} - {appointment.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{appointment.doctor}</p>
                    <p
                      className={`text-xs ${
                        appointment.status === "Confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
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
                <div className="mr-4 h-2 w-2 rounded-full bg-[#274D60]" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.patient}</span> - {activity.action}
                  </p>
                  <div className="mt-1 flex text-xs text-gray-500">
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
