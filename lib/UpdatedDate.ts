const currDate = new Date();

export default function updatedAgo(lastUpdated: Date) {
    const lastUpdatedDate = new Date(lastUpdated);

    // Check if the last updated date is the same as the current date
    const isSameDate =
        currDate.toDateString() === lastUpdatedDate.toDateString();

    if (isSameDate) {
        const diffTime = Math.abs(
            currDate.getTime() - lastUpdatedDate.getTime(),
        );
        const diffSeconds = Math.floor(diffTime / 1000); // Convert milliseconds to seconds
        return diffSeconds;
    } else {
        const diffTime = Math.abs(
            currDate.getTime() - lastUpdatedDate.getTime(),
        );
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return diffDays;
    }
}
