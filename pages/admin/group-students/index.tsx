import { GroupStudentsSection } from "@/features/admin/group-students/ui/group-students-section";

export default function GroupStudentsPage({ groupId }: { groupId: number }) {
  return <GroupStudentsSection groupId={groupId} />;
}
