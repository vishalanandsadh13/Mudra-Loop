const xlsx = require("xlsx");
const XLSX = require("xlsx");
const Income = require("../Models/Income");

exports.addIncome = async (req, res) => {
      const userId = req.user._id;

      try{
        const {icon, source, amount , date} = req.body;

        //validation check for missing income
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Create a new income entry
        const newIncome = new Income({
            userId,
            source,
            amount,
            date: new Date(date), // Ensure date is a Date object
            icon
        });
        await newIncome.save();
        res.status(200).json({ message: "Income added successfully", income: newIncome });
      }
        catch (error) {
            console.error("Error adding income:", error);
            res.status(500).json({ message: "Internal server error" });
        }   
}


exports.getAllIncome = async (req, res) => {
 const userId = req.user._id;
    try {
        // Fetch all income entries for the user
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json({ message: "Incomes fetched successfully", incomes });
    }
    catch (error) {
        console.error("Error fetching incomes:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });   
    }catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        if (incomes.length === 0) {
            return res.status(404).json({ message: "No income data found for download" });
        }
        const excelData = incomes.map(income => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }));
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "Income_Details.xlsx");
        res.download("Income_Details.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        console.error("Error downloading income data as Excel:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}
    