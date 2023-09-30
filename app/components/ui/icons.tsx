import Image from 'next/image'

export function AvatarSpinner(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <div {...props}>
      <Image
        width={8}
        height={8}
        src="/avatarfi-spinner.gif"
        alt="avatar-spinner"
      />
    </div>
  )
}
