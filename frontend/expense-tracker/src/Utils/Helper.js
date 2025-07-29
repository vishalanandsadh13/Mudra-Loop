import moment from 'moment'

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
  // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
}

export const getInitial = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
}

export const addThousandsSeparator = (value) => {
   if(value == null || isNaN(value)) return '';

   const [integerPart, decimalPart] = value.toString().split('.');
   const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export const prepareExpenseChartData = (data = []) => {
  // Group by month and sum amounts
  const monthMap = {};
  data.forEach((item) => {
    if (!item.date) return;
    const dateObj = new Date(item.date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    if (!monthMap[month]) {
      monthMap[month] = 0;
    }
    monthMap[month] += item.amount || 0;
  });
  const chartData = Object.entries(monthMap).map(([month, amount]) => ({
    month,
    amount
  }));
  return chartData;
}

export const prepareIncomeChartData = (data = []) => {

  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format('Do MMM'),
    amount: item.amount,
    source: item.source,
  }))

  return chartData;
}