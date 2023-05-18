//// With many lines
// export const dateFormat = (date: string | Date) => {
//   let dateObj: Date;

//   if (date instanceof Date) {
//     dateObj = date;
//   } else {
//     dateObj = new Date(date)
//   }

//   const formatter = new Intl.DateTimeFormat(
//     'pt-PT',
//     { dateStyle: 'short', timeStyle: 'short' }
//   );

//   return formatter.format(dateObj);
// }


//// With less code

export const dateFormat = (date: string | Date) => {
  return new Intl.DateTimeFormat(
    'pt-BR',
    { dateStyle: 'short', timeStyle: 'short' }
  ).format(date instanceof Date ? date : new Date(date));
}