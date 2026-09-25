const formatDate = (timeStamp) => {
if (!timeStamp) return 'N/A';

const date = new Date(Number(timeStamp));
return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
});
}

export default formatDate;