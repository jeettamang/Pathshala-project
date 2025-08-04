import CourseCategory from "./CourseCategory";
import ExpenseCategory from "./ExpenseCategory";
import IncomeCategory from "./IncomeCategory";

const Categories = () => {
  return (
    <div className="flex flex-col gap-10 p-4">
      <CourseCategory />

      <ExpenseCategory />
      <IncomeCategory />
    </div>
  );
};

export default Categories;
