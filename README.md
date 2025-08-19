Leave Management System

Configure Environment Variables
Create a .env file with the following:
DB_HOST=localhost
DB_USER=root
DB_PASS=****
DB_NAME=leave_management
PORT=5000
JWT_SECRET=****
JWT_EXPIRES_IN=7d

To start backend server -> node server.js

Assumptions

1.Employees can only apply for leave after their joining date.
2.HR role is required to add employees or approve/reject leaves.
3.All leave balances are initialized when a new employee is added.
4.Default leave policies (types and balances) are pre-defined and seeded.
5.Weekends/holidays are not counted as leave days (if a holiday table is enabled).
6.Each employee has a unique email ID used for login.


Edge Cases Handled

 1.Leave cannot start before employee joining date.
 2.end_date must be greater than or equal to start_date.
 3.Balance Validation → Leave balance is checked before approval.
 4.Role Validation → HR-only endpoints are protected from employee access.
 5.Authentication → JWT-based auth with refresh tokens, invalid/expired tokens return proper error messages.

 
 Potential Improvements-

 Half-Day Leaves → Allow more granular leave applications.
 Scalability Enhancements → Database read replicas, caching frequently accessed reports, and async job queues for background tasks.
 AI-Integration → Predict absenteeism trends and suggest staffing adjustments.
 Automated Reports → Scheduled monthly/quarterly reports emailed to HR.


