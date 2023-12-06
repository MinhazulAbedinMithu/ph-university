import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

//Create Academic Semester
const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.createAcademicSemester(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});

// Get all academic semesters
const getAcademicSemesters = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.getAcademicSemesters();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Academic Semesters',
    data: result,
  });
});

// Get Academic semester by id
const getAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.getAcademicSemester(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get Single Semester',
    data: result,
  });
});

// Update Academic Semester by id
const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const result = academicSemesterServices.updateAcademicSemester({
    id: req.params.id,
    body: req.body,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Updated Successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
};
