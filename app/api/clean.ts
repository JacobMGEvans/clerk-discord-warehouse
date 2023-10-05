import type { NextApiRequest, NextApiResponse } from "next";

const deleteItem = async (id: string) => {
  // return await xata.db.nextjs_with_xata_example.delete(id)
};

export async function cleanDummyDataFromXata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  await deleteItem(id);

  res.json({
    ok: true,
  });
}

export default cleanDummyDataFromXata;
