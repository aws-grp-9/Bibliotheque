interface HeaderProps {
    headerLabel: string;
    messageLabel?: string;
}
export default function Header({headerLabel,messageLabel}:HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">{headerLabel}</h1>
      <p className="text-sm text-gray-500">{messageLabel}</p>
    </div>
  )
}