import express from 'express';

import authorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/reports', reportRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});