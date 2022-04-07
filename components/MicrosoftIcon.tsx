import { SvgIcon, SvgIconProps } from '@mui/material';

export default function MicrosoftIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox={'0 0 24 24'}>
      <rect x='0' y='0' width='11' height='11' fill='currentColor'/>
      <rect x='0' y='12' width='11' height='11' fill='currentColor'/>
      <rect x='12' y='0' width='11' height='11' fill='currentColor'/>
      <rect x='12' y='12' width='11' height='11' fill='currentColor'/>
    </SvgIcon>
  );
}