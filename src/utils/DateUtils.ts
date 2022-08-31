class DateUtils {
  getLocaleDateStringFromString(date: string): string {
    return this.getLocaleDateString(new Date(date));
  }
  getLocaleDateString(date: Date): string {
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString([], timeFormat);
  }
}
export default new DateUtils();
