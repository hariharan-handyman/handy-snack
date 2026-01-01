export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
    }).format(date);
}

export function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}
