/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, Home, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

// Mock data for charts
const salesByMonth = [
  { month: 'Jan', sales: 2400000, properties: 3 },
  { month: 'Feb', sales: 1800000, properties: 2 },
  { month: 'Mar', sales: 3200000, properties: 4 },
  { month: 'Apr', sales: 2800000, properties: 3 },
  { month: 'May', sales: 4100000, properties: 5 },
  { month: 'Jun', sales: 3600000, properties: 4 },
];

const propertyTypeDistribution = [
  { type: 'Villa', value: 35, count: 8 },
  { type: 'Penthouse', value: 25, count: 6 },
  { type: 'Mansion', value: 20, count: 5 },
  { type: 'Beach House', value: 15, count: 3 },
  { type: 'Apartment', value: 5, count: 2 },
];

const topLocations = [
  { location: 'Beverly Hills', sales: 8500000, properties: 5 },
  { location: 'Manhattan', sales: 7200000, properties: 4 },
  { location: 'Miami Beach', sales: 6800000, properties: 6 },
  { location: 'Malibu', sales: 5400000, properties: 3 },
  { location: 'Los Angeles', sales: 4200000, properties: 4 },
];

const conversionRate = [
  { month: 'Jan', rate: 18 },
  { month: 'Feb', rate: 22 },
  { month: 'Mar', rate: 25 },
  { month: 'Apr', rate: 20 },
  { month: 'May', rate: 28 },
  { month: 'Jun', rate: 24 },
];

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const stats = [
  {
    title: 'Total Sales',
    value: '$18.9M',
    change: '+23.5%',
    icon: DollarSign,
    description: 'vs previous period',
  },
  {
    title: 'Properties Sold',
    value: '21',
    change: '+15.2%',
    icon: Home,
    description: 'in the last 6 months',
  },
  {
    title: 'Average Price',
    value: '$900K',
    change: '+8.1%',
    icon: TrendingUp,
    description: 'per property',
  },
  {
    title: 'Active Clients',
    value: '156',
    change: '+32.4%',
    icon: Users,
    description: 'potential buyers',
  },
];

// eslint-disable-next-line max-lines-per-function
export const AnalyticsLayout = (): React.ReactElement => {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold">Sales Analytics</h2>
          <p className="mt-2 text-muted-foreground">Visualize your platform's performance</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last month</SelectItem>
            <SelectItem value="3months">Last 3 months</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-serif text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
                <span className="text-sm text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales by Month */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: 'Sales',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="min-h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={value => `$${value / 1000000}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Property Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: 'Percentage',
                },
              }}
              className="min-h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, value }) => `${type}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypeDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: 'Sales',
                  color: 'hsl(var(--chart-2))',
                },
              }}
              className="min-h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topLocations} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" tickFormatter={value => `$${value / 1000000}M`} />
                  <YAxis dataKey="location" type="category" className="text-xs" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill="hsl(var(--chart-2))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Conversion Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                rate: {
                  label: 'Rate %',
                  color: 'hsl(var(--chart-3))',
                },
              }}
              className="min-h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionRate}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={value => `${value}%`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-3))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Sale Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-4xl font-bold">45</div>
            <p className="mt-2 text-sm text-muted-foreground">days from listing to sale</p>
            <div className="mt-4 text-sm text-emerald-600">-12% vs previous month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-4xl font-bold">$124M</div>
            <p className="mt-2 text-sm text-muted-foreground">in active properties</p>
            <div className="mt-4 text-sm text-emerald-600">+18% vs previous month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-serif text-4xl font-bold">1,247</div>
            <p className="mt-2 text-sm text-muted-foreground">buyer inquiries</p>
            <div className="mt-4 text-sm text-emerald-600">+24% vs previous month</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
