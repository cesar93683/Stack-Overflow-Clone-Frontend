class DateUtils {
  getLocaleDateString(date: string): string {
    const timeFormat: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleDateString([], timeFormat);
  }
}
export default new DateUtils();
