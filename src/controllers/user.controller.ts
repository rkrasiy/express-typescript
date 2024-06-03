
import { Response, Request } from 'express';

import userModel from "../models/user.model";

export const getUsers = async (req:Request, res: Response) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  const _limit = isNaN(limit) ? 5 : limit;
  const _offset = isNaN(offset) ? 5 : offset;

  const query = {state: true};

  const [total, users] = await Promise.all([
    userModel.countDocuments(query),
    userModel.find(query)
      .skip(_offset)
      .limit(_limit)
  ]);

  res.json({
    total,
    items: users
  })
}

export const updateUsers = async (req:Request, res: Response) => {

  const { id } = req.params;
  const { _id, ...rest} = req.body;

  //TODO : validate userID
  const user = await userModel.findByIdAndUpdate(id, rest, { new: true });

  res.json(user);
}

export const newUser = async  (req:Request, res: Response) => {

  const { full_name, email, phone } = req.body;
  const user = new userModel({ full_name, email, phone });

  await user.save();
  res.status(201).json(user);
}

export const removeUser = async (req:Request, res: Response) => {
  const { id } = req.params;

  const user = await userModel.findByIdAndUpdate(id, { state: false}, {new: true});
  res.json(user);
}
