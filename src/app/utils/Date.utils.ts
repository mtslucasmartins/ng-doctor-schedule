export class DateUtils {
  // Pega o primeiro dia do mês
	public static getMonthFirstDay(lastMonth: boolean) {
		const d = new Date();
		if (lastMonth) { return new Date(d.getFullYear(), (d.getMonth() - 1), 1); }
		return new Date(d.getFullYear(), d.getMonth(), 1);
	}

	// Pega o último dia do mês
	public static getMonthLastDay(lastMonth: boolean) {
		const d = new Date();
		if (lastMonth) { return new Date(d.getFullYear(), d.getMonth(), 0); }
		return new Date(d.getFullYear(), d.getMonth() + 1, 0);
	}

	// Pega o primeiro e o último dia da semana, exemplo: hoje(09/08/2019) - resultado: 04/08/2019 e 10/08/2019
	public static getWeekDay(weekDay: number) {
		const d = new Date();
		const day = d.getDay(),
			diff = d.getDate() - day + (day === 0 ? -6 : weekDay); // adjust when day is sunday
		return new Date(d.setDate(diff));
  }
}