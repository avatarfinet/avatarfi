import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB, serverAuth } from '@/utils'
import { User } from '@/models'
import {
  PUT_USER_NAME,
  PUT_USER_PHONE,
  PUT_USER_SURNAME,
  PATCH_ADD_USER_TRACKED_GECKO_COINS,
  PATCH_PULL_USER_TRACKED_GECKO_COINS,
} from '@/lib'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req
  const { id, action, fields } = query
  const { name, surname, phone, trackedGeckoCoins } = body
  const sendStatus500 = () => res.status(500).send('Something went wrong.')
  const sendStatus405ActionNotSuppoerted = () =>
    res.status(405).send('req_query_actionType_not_supported')
  await connectDB()
  const auth = await serverAuth(req, res)

  switch (method) {
    case 'PUT':
      if (auth.isError) break
      switch (action) {
        case PUT_USER_NAME:
          User.findOneAndUpdate(
            { _id: id },
            { name },
            { new: true, projection: 'name' }
          )
            .then((doc) => res.status(200).json(doc?.name))
            .catch(sendStatus500)
          break
        case PUT_USER_SURNAME:
          User.findOneAndUpdate(
            { _id: id },
            { surname },
            { new: true, projection: 'surname' }
          )
            .then((doc) => res.status(200).json(doc?.surname))
            .catch(sendStatus500)
          break
        case PUT_USER_PHONE:
          User.findOneAndUpdate(
            { _id: id },
            { phone },
            { new: true, projection: 'phone' }
          )
            .then((doc) => res.status(200).json(doc?.phone))
            .catch(sendStatus500)
          break
        default:
          sendStatus405ActionNotSuppoerted()
          break
      }
      break
    case 'PATCH':
      if (auth.isError) break
      switch (action) {
        case PATCH_ADD_USER_TRACKED_GECKO_COINS:
          User.findOneAndUpdate(
            { _id: id },
            { $addToSet: { trackedGeckoCoins: { $each: trackedGeckoCoins } } },
            { new: true, projection: 'trackedGeckoCoins' }
          )
            .then((doc) => res.status(200).json(doc?.trackedGeckoCoins ?? []))
            .catch(sendStatus500)
          break
        case PATCH_PULL_USER_TRACKED_GECKO_COINS:
          User.findOneAndUpdate(
            { _id: id },
            { $pull: { trackedGeckoCoins: { $in: trackedGeckoCoins } } },
            { new: true, projection: 'trackedGeckoCoins' }
          )
            .then((doc) => res.status(200).json(doc?.trackedGeckoCoins ?? []))
            .catch(sendStatus500)
          break
        default:
          sendStatus405ActionNotSuppoerted()
          break
      }
      break
    case 'GET':
      User.findOne({ _id: id }, fields)
        .then((doc) => res.status(200).json(doc))
        .catch(sendStatus500)
      break
    default:
      res.status(405).send('req_method_not_supported')
      break
  }
}

export default handler
