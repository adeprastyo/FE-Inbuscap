import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Archive, EarthIcon, EditIcon, Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import CustomAlert from "./custom-alert";
import { Link, useNavigate } from "react-router-dom";
import { formatRupiah } from "@/utils/format-money";
import { deleteBusiness } from "@/utils/apis/business/api";
import { toast } from "./ui/use-toast";

interface Props {
  title: string;
  desc: string;
  target: number;
  collected: number;
  image: string;
  id: number;
  withOption?: boolean;
  archive?: boolean;
  invested?: boolean;
}

export default function ProposalCard(props: Props) {
  const [showPublicDialog, setShowPublicDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const {
    title,
    desc,
    image,
    target,
    collected,
    id,
    withOption,
    archive,
    invested,
  } = props;

  async function handleDeleteBusiness(proposals_id: string) {
    try {
      const result = await deleteBusiness(proposals_id);
      toast({ description: result.message });

      navigate("/my-business");
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  let persentase = Math.round((collected / target) * 100);

  return (
    <>
      <div className="w-11/12 h-[330px] mx-auto flex bg-slate-50 border border-[#00ad26] rounded-xl mb-10">
        <div className="w-full hidden md:block bg-slate-100 rounded-xl">
          <img src={image} alt="" className="w-full h-full rounded-xl" />
        </div>

        <div className="flex flex-col w-11/12 justify-around p-5">
          {withOption ? (
            <div className="self-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" forceMount>
                  {archive ? (
                    <>
                      <DropdownMenuItem
                        className="flex gap-2"
                        onClick={() => setShowPublicDialog(true)}
                      >
                        <EarthIcon className="w-5" />
                        Go Public
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="flex gap-2"
                        onClick={() => setShowArchiveDialog(true)}
                      >
                        <Archive className="w-5" />
                        Archive
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuItem>
                    <Link
                      to={`/business/${id}/update`}
                      className="flex gap-2 items-center"
                    >
                      <EditIcon className="w-5" />
                      <p>Edit</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 flex gap-2"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="w-5" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <></>
          )}

          <div className="mb-7">
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-xl">
              {formatRupiah.format(collected)} / {formatRupiah.format(target)}
            </p>
            <p className="my-2 text-sm">{desc.slice(0, 90)}.....</p>
            <p>{persentase}%</p>
            <Progress
              value={persentase}
              className="mb-4 border border-[#006516] bg-slate-200"
            />

            <>
              <Link
                to={invested ? `/invested-business/${id}` : `/business/${id}`}
              >
                <Button className="w-1/4 bg-[#00ad26] hover:bg-[#006516]">
                  See Details
                </Button>
              </Link>
            </>
          </div>
        </div>
      </div>
      <CustomAlert
        open={showPublicDialog}
        title="Kamu Yakin Untuk Mempublikasikan Kembali Proposal?"
        description="Proposal ini akan dapat terlihat lagi oleh publik, artinya crowd funding dilanjutkan."
        onCancel={() => {
          setShowPublicDialog(false);
        }}
      />
      <CustomAlert
        open={showArchiveDialog}
        title="Kamu Yakin Untuk Mengarsip Proposal Ini?"
        description="Proposal ini akan tersimpan di halaman Archive Proposals' dan tidak akan terlihat oleh publik."
        onCancel={() => {
          setShowArchiveDialog(false);
        }}
      />
      <CustomAlert
        open={showDeleteDialog}
        title="Kamu Yakin Menghapus Proposal Ini?"
        description="Ini akan menghapus Proposal dan tidak dapat dikembalikan."
        onAction={() => handleDeleteBusiness(props.id.toString())}
        onCancel={() => {
          setShowDeleteDialog(false);
        }}
      />
    </>
  );
}
