import Layout from "@/components/layout";
import ProposalCard from "@/components/proposal-card";
import landingImg from "@/assets/img.png";
import { Separator } from "@/components/ui/separator";
import { getBusinesses } from "@/utils/apis/business/api";
import { useEffect, useState } from "react";
import { IBusiness } from "@/utils/apis/business/type";
import { toast } from "sonner";
import { useAuthStore } from "@/utils/zustand/store";

function Homepage() {
  const [datas, setDatas] = useState<IBusiness[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    handleGetBusiness();
  }, []);

  const handleGetBusiness = async () => {
    try {
      const result = await getBusinesses();
      setDatas(result.data);
    } catch (error) {
      toast((error as Error).message.toString());
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:items-center">
        <div className="flex justify-between items-center mb-10">
          <div className="xl:w-1/2 xs:w-full">
            <div className="mt-10">
              <p className="font-bold xl:text-6xl md:text-5xl text-2xl mb-5">
                What is{" "}
                <span className="font-lora font-bold text-[#00ac26]">
                  Inbuscap.id
                </span>{" "}
                ?
              </p>
              <p className="text-lg tracking-wider leading-6">
                Inbuscap.id (Investing Business Capital) is an online platform
                that connects investors with entrepreneurs who need funding.
                This platform was founded with the aim of :
              </p>
              <ul className="list-disc ms-10 text-lg tracking-wider leading-6">
                <br />
                <li>
                  Helping investors find potential and trusted investment
                  opportunities.
                </li>
                <li>
                  Helping entrepreneurs get funding to develop their businesses.
                </li>
              </ul>
            </div>
            <br />

            <p className="text-lg tracking-wider leading-6">
              Inbuscap.id offers two main services :
            </p>

            <div className="text-md tracking-wider leading-6 ms-5">
              <div>
                <p className="font-bold"><br />1. Investment Services</p>
                <p>Inbuscap.id provides a platform for investors to:</p>
                <ol className="list-disc ms-10">
                  <li>
                    Looking for investment opportunities in various business
                    sectors.
                  </li>
                  <li>Make investments easily and safely.</li>
                  <li>Monitor their investment performance in real-time.</li>
                </ol>
              </div>
            </div>
            <br />
            <div className="text-md tracking-wider leading-6 ms-5">
              <p className="font-bold">2. Business Funding Services</p>
              <p>Inbuscap.id provides a platform for entrepreneurs to :</p>
              <ol className="list-disc ms-10">
                <li>Submit a funding proposal for your business.</li>
                <li>
                  Looking for investors who are interested in his business.
                </li>
                <li>Receive funding to develop their business.</li>
              </ol>
            </div>
          </div>
          <div className="w-1/2 bg-red-100 hidden xl:block">
            <img src={landingImg} alt="" className="w-full" />
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <h1 className="self-start font-semibold text-3xl mb-5">
            All Bussiness
          </h1>

          <Separator className="mb-10 rounded-full bg-[#006516]" />

          {datas.map((data) => (
            <ProposalCard
              key={data.id}
              title={data.title}
              desc={data.description}
              image={data.image}
              target={data.capital}
              collected={data.collected}
              id={data.id}
              withOption={data.email === user?.email}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Homepage;
