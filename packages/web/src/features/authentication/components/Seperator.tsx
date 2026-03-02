const Seperator = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">OR</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
};

export default Seperator;
