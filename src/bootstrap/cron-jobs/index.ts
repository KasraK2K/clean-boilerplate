//==============================================================================
//
//   ####  #####     #####   ##     ##            ##   #####   #####    ####
//  ##     ##  ##   ##   ##  ####   ##            ##  ##   ##  ##  ##  ##
//  ##     #####    ##   ##  ##  ## ##            ##  ##   ##  #####    ###
//  ##     ##  ##   ##   ##  ##    ###        ##  ##  ##   ##  ##  ##     ##
//   ####  ##   ##   #####   ##     ##         ####    #####   #####   ####
//
//==============================================================================

/** NOTE for developers to more easily understand the code:
 * in cron jobs, we use the following syntax:
 * simple syntax: * * * * ? *
 * complex syntax: 0 0/5 14,18,3-39,52 ? JAN,MAR,SEP MON-FRI 2002-2011
 *
 * @param { first    * is Seconds }
 * @param { second   * is Minutes }
 * @param { third    * is Hours }
 * @param { fourth   * is Day of the Month }
 * @param { fifth    * is Month }
 * @param { sixth    * is Day of the Week }
 * @param { seventh  * is Year }
 *
 * SECTION Operators:
 * @param asterisk (*)  Specifies all possible values for a field
 * An asterisk in the hour time field is equivalent to “every hour.”
 *
 * @param question A question mark (?) is allowed in the day-of-month
 * and day-of-week fields. It is used to specify “no specific value,”
 * which is useful when you need to specify something in one of these
 * two fields, but not in the other.
 *
 * If you want a trigger to fire on a particular day of the month
 * (for example, the 10th), but you don't care what day of the week that
 * is, enter 10 in the day-of-month field, and ? in the day-of-week field.
 *
 * @param dash (-) Specifies a range of values
 * 2-5, which is equivalent to 2,3,4,5
 *
 * @param slash (/) Used to skip a given number of values
 * /3 in the hour time field is equivalent to 0,3,6,9,12,15,18,21.
 * The asterisk ( * ) specifies “every hour,” but the /3 means only the
 * first, fourth, seventh.
 *
 * You can use a number in front of the slash to set the initial value.
 * For example, 2/3 means 2,5,8,11, and so on.
 *
 * @param comma (,) Specifies a list of values like 1,3,4,7,8
 *
 * @param L (“last”) The L character is allowed for the day-of-month
 * and day-of-week fields.
 * Specifies either the last day of the month, or the last xxx day of the month.
 *
 * The value L in the day-of-month field means “the last day of the month,” which
 * is day 31 for January, or day 28 for February in non-leap years. If you use L in
 * the day-of-week field by itself, it simply means 7 or SAT. But if you use it in
 * the day-of-week field after another value, it means “the last xxx day of the month.”
 * For example, 6L means “the last Friday of the month.”
 *
 * HINT:When you use the L option, be careful not to specify lists or ranges of values.
 * Doing so causes confusing results.
 *
 * @param W (“weekday”) The W character is allowed for the day-of-month field.
 * Specifies the weekday (Monday-Friday) nearest the given day.
 *
 * If you specify 15W as the value for the day-of-month field, the meaning is
 * “the nearest weekday to the 15th of the month.” So if the 15th is a Saturday,
 * the trigger fires on Friday the 14th. If the 15th is a Sunday, the trigger
 * fires on Monday the 16th. If the 15th is a Tuesday, it fires on Tuesday the 15th.
 * However, if you specify 1W as the value for day-of-month, and the 1st is a Saturday,
 * the trigger fires on Monday the 3rd, because it does not “jump” over the boundary of
 * a month’s days. The W character can only be specified when the day-of-month is a single
 * day, not a range or list of days.

 * HINT:You can combine the L and W characters for the day-of-month expression to yield LW,
 * which translates to “last weekday of the month.”
 * 
 * @param pound sign (#) The pound sign ( # ) character is allowed for the day-of-week field. This
 * character is used to specify “the nth” xxx day of the month.
 * 
 * The value of 6#3 in the day-of-week field means the third Friday of the month (day 6 = Friday
 * and #3 = the 3rd one in the month).
 * 
 * Other Examples: 2#1 specifies the first Monday of the month and 4#5 specifies the fifth Wednesday
 * of the month. However, if you specify #5 and there are fewer than 5 of the given day-of-week in
 * the month, no firing occurs that month.
 * 
 * SECTION Some Examples:
 * |---------------------------------------------------------------------------------------------------------------------|
 * | Cron Expression Example    | Description                                                                            |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 0 12 * * ?               | Fire at 12:00 p.m. (noon) every day                                                    |
 * | --------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 ? * *              | Fire at 10:15 a.m. every day                                                           |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 * * ?              | Fire at 10:15 a.m. every day                                                           |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 * * ? *            | Fire at 10:15 a.m. every day                                                           |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 * * ? 2012         | Fire at 10:15 a.m. every day during the year 2012                                      |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 * 14 * * ?               | Fire every minute starting at 2:00 p.m. and ending at 2:59.p.m., every day             |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 0/5 14 * * ?             | Fire every five minutes starting at 2:00 p.m. and ending at 2:55 p.m., every day       |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 0/5 14,18 * * ?          | Fire every five minutes starting at 2:00 p.m. and ending at 2:55 p.m., and fire every  |
 * |                            | five minutes starting at 6:00 p.m. and ending at 6:55 p.m., every day                  |
 * |---------------------------------------------------------------------------------------------------------------------| 
 * | 0 0-5 14 * * ?             | Fire every minute starting at 2:00 p.m. and ending at 2:05.p.m., every day             |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 10,44 14 ? 3 WED         | Fire at 2:10 p.m. and at 2:44 p.m. every Wednesday in the month of March               |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 ? * MON-FRI        | Fire at 10:15 a.m. every Monday, Tuesday, Wednesday, Thursday and Friday               |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 15 * ?             | Fire at 10:15 a.m. on the 15th day of every month                                      |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 15 * ?             | Fire at 10:15 a.m. on the last day of every month                                      |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 ? * 6L             | Fire at 10:15 a.m. on the last Friday of every month                                   |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 ? * 6L 2011-2014   | Fire at 10:15 a.m. on every last Friday of every month during the years 2011, 20012,   |
 * |                            | 2014, and 2014                                                                         |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 15 10 ? * 6#3            | Fire at 10:15 a.m. on the third Friday of every month                                  |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 0 12 1/5 * ?             | Fire at 12:00 p.m. (noon) every five days every month, starting on the first day of    |
 * |                            | the month                                                                              |
 * |---------------------------------------------------------------------------------------------------------------------|
 * | 0 11 11 11 11 ?            | Fire every November 11th at 11:11 a.m.                                                 |
 * |---------------------------------------------------------------------------------------------------------------------|
 * 
 * SECTION read more:
 * https://www.netiq.com/documentation/cloud-manager-2-5/ncm-reference/data/bexyssf.html
 * https://momentjs.com/timezone/
 */

import "./sample-job"
