const User = require("../models/User");
const OverallStat = require("../models/OverallStat");
const Transaction = require("../models/Transaction");

const getUser = async (req, res) => {
   try {
      console.log("dsfsfsfsf :    ", req.params);
      const { id } = req.params;
      const user = await User.findById(id);

      res.status(200).json(user);
   } catch (error) {
      console.log("kuch galat hua hai");
      res.status(404).json({ message: error.message });
   }
};

const getDashboardStats = async (req, res) => {
   try {
      // hardcoded values
      const currentMonth = "November";
      const currentYear = 2021;
      const currentDay = "2021-11-15";

      /* Recent Transactions */
      const transactions = await Transaction.find()
         .limit(50)
         .sort({ createdOn: -1 });

      /* Overall Stats */
      const overallStat = await OverallStat.find({ year: currentYear });

      const {
         totalCustomers,
         yearlyTotalSoldUnits,
         yearlySalesTotal,
         monthlyData,
         salesByCategory,
      } = overallStat[0];

      const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
         return month === currentMonth;
      });

      const todayStats = overallStat[0].dailyData.find(({ date }) => {
         return date === currentDay;
      });

      res.status(200).json({
         totalCustomers,
         yearlyTotalSoldUnits,
         yearlySalesTotal,
         monthlyData,
         salesByCategory,
         thisMonthStats,
         todayStats,
         transactions,
      });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};

module.exports = { getUser, getDashboardStats };
