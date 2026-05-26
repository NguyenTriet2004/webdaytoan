import { Video, FileText, Layers, MessageSquare, Smartphone } from 'lucide-react';
import { FEATURES } from '../data';

export default function FeaturesList() {
  const renderIcon = (name: string) => {
    const classStyle = "w-6 h-6 text-blue-600";
    switch (name) {
      case 'Video':
        return <Video className={classStyle} />;
      case 'FileText':
        return <FileText className={classStyle} />;
      case 'Layers':
        return <Layers className={classStyle} />;
      case 'MessageCircle':
        return <MessageSquare className={classStyle} />;
      case 'Smartphone':
        return <Smartphone className={classStyle} />;
      default:
        return <Video className={classStyle} />;
    }
  };

  return (
    <div id="features-showcase" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-16 z-20">
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/60 p-8 sm:p-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {FEATURES.map((feat) => (
            <div key={feat.id} className="flex flex-col items-center text-center space-y-3 px-2 group">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/50 group-hover:scale-105 group-hover:shadow-md transition-all duration-300">
                {renderIcon(feat.iconName)}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors font-display">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium px-1">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
