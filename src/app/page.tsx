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
		</div>
	);
}
