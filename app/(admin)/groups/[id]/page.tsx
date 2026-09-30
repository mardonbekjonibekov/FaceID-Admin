import { notFound } from "next/navigation";

import GroupStudentsPage from "@/pages/admin/group-students";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const groupId = Number(id);
  if (!Number.isInteger(groupId) || groupId < 1) notFound();

  return <GroupStudentsPage groupId={groupId} />;
}
