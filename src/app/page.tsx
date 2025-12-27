import Image from "next/image";

export default function Home() {
	return (
		<div>
			<video
                className="w-full h-auto bg-black"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/iphonebanner.webp"
            >
                <source
                    src="BlenderPhoneDemo.mp4"
                    type='video/mp4;'
                />
            </video>

			<div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1 bg-accent">
				<div className="bg-background">
					<Image
                    src="/product-1.png"
                    alt="Product 1"
                    width={1080}
                    height={1080}
                    className="w-full h-auto"
                    priority
                />
				</div>
				<div className="bg-background">
					<Image
                    src="/product-2.png"
                    alt="Product 2"
                    width={1080}
                    height={1080}
                    className="w-full h-auto"
                    priority
                />
				</div>
				<div className="bg-background">
					<Image
                    src="/product-3.webp"
                    alt="Product 3"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                    priority
                />
				</div>
			</div>


		</div>
	);
}
