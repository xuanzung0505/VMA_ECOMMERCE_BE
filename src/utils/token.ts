import jwt from "jsonwebtoken";

export const generateToken = (
  user: any
  // userId: string, //
  // userType: string
) => {
  // console.log(process.env);

  const secret: string = process.env.JWT_TOKEN_SECRET || "";
  const expiresIn = process.env.EXPIRES_ACCESS_TOKEN;
  // console.log(expiresIn);

  const token = jwt.sign(
    {
      // user,
      //
      userId: user._id,
      userType: user.userType,
    },
    secret,
    { algorithm: "HS256", expiresIn: expiresIn }
  );

  return token;
};

export const generateRefreshToken = (
  user: any
  // userId: string,
  //
  // userType: string
) => {
  const secret: string = process.env.JWT_REFRESH_TOKEN_SECRET || "";
  const expiresIn = process.env.EXPIRES_REFRESH_TOKEN;

  const token = jwt.sign(
    {
      // user,
      //
      userId: user._id,
      userType: user.userType,
    },
    secret,
    { expiresIn }
  );

  return token;
};

// export const verifyToken = async (token?: string) => {
//   if (!token) {
//     return null;
//   } else {
//     const [
//       // data, //
//       dataToken,
//     ] = await Promise.all([
//       // TokenModel.findOne({ token, deletedById: { $exists: false } }),
//       jwt.verify(
//         token,
//         process.env.JWT_TOKEN_SECRET,
//         async (err: any, data: any) => {
//           if (err) {
//             return null;
//           } else {
//             return data;
//           }
//         }
//       ),
//     ]);

//     if (
//       // !data
//       //  ||
//       !dataToken
//     ) {
//       return null;
//     }

//     return dataToken;
//   }
// };

// export const verifyRefreshToken = async (refreshToken: string) => {
//   const refToken = refreshToken && refreshToken.split(" ")[1];

//   // const token = await TokenModel.findOne({
//   //   refreshToken: refToken,
//   //   deletedById: { $exists: false },
//   // });

//   // if (!token) {
//   //   throw new ApiError(400, ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
//   // }

//   return new Promise((resolve, reject) => {
//     jwt.verify(
//       token.refreshToken,
//       process.env.JWT_REFRESH_TOKEN_SECRET,
//       (err: any, data: any) => {
//         if (err) {
//           return reject(err);
//         }
//         resolve(data);
//       }
//     );
//   });
// };

// export const genarateTokenQrCode = async (tokenCode: string): Promise<any> => {
//   try {
//     if (!tokenCode) {
//       throw new ApiError(400, ExceptionCode.TOKEN_INVALID);
//     } else {
//       const token: string = await jwt.sign(
//         {
//           token: tokenCode,
//         },
//         process.env.JWT_TOKEN_SECRET || "",
//         {
//           expiresIn: "300s",
//         }
//       );
//       return token;
//     }
//   } catch (error) {
//     return error;
//   }
// };

// export const verifyQrCode = async (loginQRCode: string): Promise<any> => {
//   try {
//     const data = jwt.verify(loginQRCode, process.env.JWT_TOKEN_SECRET || "");

//     if (!data) {
//       throw new ApiError(400, ExceptionCode.TOKEN_INVALID);
//     }

//     return data;
//   } catch (error: any) {
//     if (error.name == "TokenExpiredError") {
//       throw new ApiError(400, ExceptionCode.TOKEN_INVALID);
//     } else {
//       return error;
//     }
//   }
// };
