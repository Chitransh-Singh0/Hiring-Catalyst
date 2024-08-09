import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";

export const register = async(req, res, next) => {
    const { name, email, password } = req.body;

    // validate fields
    if(!name){
        next("Company Name is required! ");
        return;
    }
    if(!email){
        next("Email is required! ");
        return;
    }
    if(!name){
        next("Password is required adn must be greater than 6 characters! ");
        return;
    }

    try {
        const accountExist = await Companies.findOne({email});

        if(accountExist) {
            next("Email already registered, Please Login with another email");
            return
        }

        // create a new account
        const company = await Companies.create({
            name,
            email,
            password,
        });

        // user token
        const token = company.createJWT();

        res.status(201).json({
            succees:true,
            message: "Company Account created successfully",
            user : {
                _id : company._id,
                name : company.name,
                email : company.email,
            },token,
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message : error.message});
    }
}

export const signIn = async (req, res, next) =>{
    const {email, password} = req.body;

    try {
        
        // Validation
        if(!email || !password){
            next("Please Provide User Credentials");
            return;
        }

        const company = await Companies.findOne({email}).select("+password");

        if(!company){
            next("Invalid email or Password");
            return;
        }

        // Compare password
        const isMatch =  await company.comparePassword(password);
        if(!isMatch){
            next("Invalid email pr password");
            return;
        }
        company.password = undefined;
        
        const token = company.createJWT();

        res.status(200).json({
            success:true,
            message: "LogIn successfull",
            user: company,
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({message: error.message});
    }
} 

export const updateCompanyProfile = async (req, res, next) => {
    const{name, contact, location, profileUrl, about} = req.body;

    try {
        // validation
        if (!name || !location || !about || !contact || !profileUrl) {
            next("Please Provide All Required Fields");
            return;
          }
      
          const id = req.body.user.userId;
      
          if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No Company with id: ${id}`);

          const updateCompany = {
            name,
            contact,
            location,
            profileUrl,
            about,
            _id: id,
          };
      
          const company = await Companies.findByIdAndUpdate(id, updateCompany, {
            new: true,
          });
      
          const token = company.createJWT();
      
          company.password = undefined;
      
          res.status(200).json({
            success: true,
            message: "Company Profile Updated Successfully",
            company,
            token,
          });


    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message});
    }
}

// Get Company Profile

export const getCompanyProfile = async (req, res, next) =>{

    try {
        const id = req.body.user.userId;
    
        const company = await Companies.findById({ _id: id });
    
        if (!company) {
          return res.status(200).send({
            message: "Company Not Found",
            success: false,
          });
        }
    
        company.password = undefined;
        res.status(200).json({
          success: true,
          data: company,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }

}


// Get all Companies
export const getCompanies= async (req, res, next) => {

    try {
        const { search, sort, location } = req.query;
    
        //conditons for searching filters either by search or location
        const queryObject = {};
    
        if (search) {
          queryObject.name = { $regex: search, $options: "i" };
        }
    
        if (location) {
          queryObject.location = { $regex: location, $options: "i" };
        }
    
        let queryResult = Companies.find(queryObject).select("-password");
    
        // SORTING 
        if (sort === "Newest") {
          queryResult = queryResult.sort("-createdAt");
        }
        if (sort === "Oldest") {
          queryResult = queryResult.sort("createdAt");
        }
        if (sort === "A-Z") {
          queryResult = queryResult.sort("name");
        }
        if (sort === "Z-A") {
          queryResult = queryResult.sort("-name");
        }
    
        // PADINATIONS
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
    
        const skip = (page - 1) * limit;
    
        // records count
        const total = await Companies.countDocuments(queryResult);
        const numOfPage = Math.ceil(total / limit);
        // move next page
        // queryResult = queryResult.skip(skip).limit(limit);
    
        // show mopre instead of moving to next page
        queryResult = queryResult.limit(limit * page);
    
        const companies = await queryResult;
    
        res.status(200).json({
          success: true,
          total,
          data: companies,
          page,
          numOfPage,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      };
}

// Get Company JObs
export const getCompanyJobListing= async (req, res, next) => {


    const { search, sort } = req.query;
  const id = req.body.user.userId;

  try {
    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.location = { $regex: search, $options: "i" };
    }

    let sorting;
    //sorting || another way
    if (sort === "Newest") {
      sorting = "-createdAt";
    }
    if (sort === "Oldest") {
      sorting = "createdAt";
    }
    if (sort === "A-Z") {
      sorting = "name";
    }
    if (sort === "Z-A") {
      sorting = "-name";
    }

    let queryResult = await Companies.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: sorting },
    });
    const companies = await queryResult;

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

// Get a specific Company by ID
export const getCompanyById= async (req, res, next) => {

    try {
        const { id } = req.params;
    
        const company = await Companies.findById({ _id: id }).populate({
          path: "jobPosts",
          options: {
            sort: "-_id",
          },
        });
    
        if (!company) {
          return res.status(200).send({
            message: "Company Not Found",
            success: false,
          });
        }
    
        company.password = undefined;
    
        res.status(200).json({
          success: true,
          data: company,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}