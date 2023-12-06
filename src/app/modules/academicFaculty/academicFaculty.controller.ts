import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.service';

//create Academic faculty
const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const newAcademicFaculty =
    await academicFacultyServices.createAcademicFaculty(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Faculty created Successfylly',
    data: newAcademicFaculty,
  });
});

//Get All academic faculty
const getAllAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.getAllAcademicFaculty();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch all Academic faculty',
    data: result,
  });
});

//Get Single Academic faculty
const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.getSingleAcademicFaculty(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get single Academic faculty',
    data: result,
  });
});

// Update Academic faculty
const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.updateAcademicFaculty(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  });
});

// Delete Academic faculty
const deleteAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.deleteAcademicFaculty(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  });
});

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
